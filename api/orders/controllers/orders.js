"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.orders.create(data, { files });
    } else {
      entity = await strapi.services.orders.create(ctx.request.body);
    }
    entity = sanitizeEntity(entity, { model: strapi.models.orders });
    // await strapi.plugins["email"].services.email.send({
    //   to: "dandyling2@gmail.com",
    //   from: "admin@strapi.io",
    //   subject: "New order",
    //   text: `
    //     Hero
    //   `,
    // });

    return entity;
  },
};
