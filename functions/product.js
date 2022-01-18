require("dotenv").config();
const Airtable = require("airtable-node");
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API,
})
  .base("appzrEOwuBAF4B6ab")
  .table("products_ecom");
exports.handler = async (event, context) => {
  const { id } = event.queryStringParameters;
  console.log(id);
  if (id) {
    try {
      const product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: `there is no product with id: ${id}`,
        };
      }

      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {}

    return {
      statusCode: 500,
      body: "server error",
    };
  }

  return {
    statusCode: 400,
    body: "Please provide a correct id",
  };
};
