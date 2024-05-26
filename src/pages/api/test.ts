// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import { NextResponse } from "next/server";
// import pg from "pg";
// const { Pool } = pg;

// const pool = new Pool({
//   host: "sv95.ifastnet.com",
//   user: "pikadone_pikadone",
//   password: "n4w55S9;rkXD*U",
//   database: "pikadone_aaaa",
//   port: 5432,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 200000,
// });

const router = createRouter<NextApiRequest, NextApiResponse>();

const passport = { session: () => null };

router
  // Use express middleware in next-connect with expressWrapper function
  //   .use(expressWrapper(passport.session()))
  // A middleware example
  .use(async (req, res, next) => {
    // const client = await pool.connect();
    // await client.query("SELECT NOW()");
    // client.release();
    const start = Date.now();
    await next(); // call next in chain
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .get((req, res) => {
    const user = { name: "Stefan2" };
    const response = NextResponse.json(user);
    const end = Date.now();
    // console.log(`Request took ${end - start}ms`);
    return response;
  });

export const config = {
  runtime: "edge",
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
