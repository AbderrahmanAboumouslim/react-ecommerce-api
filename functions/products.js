require("dotenv").config();

const Airtable = require("airtable-node");
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API,
})
  .base("appzrEOwuBAF4B6ab")
  .table("products_ecom");
exports.handler = async (event, context) => {
  try {
    const { records } = await airtable.list();
    const products = records.map((p) => {
      const {
        id,
        fields: {
          name,
          images,
          description,
          company,
          category,
          colors,
          shipping,
          price,
          featured,
        },
      } = p;
      const url = images[0].url;
      return {
        id,
        name,
        description,
        company,
        category,
        colors,
        shipping,
        price,
        featured,
        url,
      };
    });
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "server error",
    };
  }
};
