// @flow

'use strict';

import express from 'express';
import invariant from 'invariant';
import {sequelize} from '../../class/schema';

let router = express.Router();

/**
input
- distinct field
- granularity (group by)
- where filter (object)
*/

type chartParams = {
  //granularity: number, // in seconds
  whereFilter: string,
  distinctField?: string,
  table: string,
};

function constructChartSQL(input: chartParams): string {
  // convert UTC to cali time
  // UTC to PST is -8 hours
  let sql = 'SELECT DATE(DATE_SUB(createdAt, INTERVAL 8 HOUR)) AS time, ';
  if (input.distinctField) {
    sql += `COUNT(DISTINCT ${input.distinctField}) AS count`;
  } else {
    sql += 'COUNT(1) AS count';
  }
  sql += ` FROM ${input.table}`;
  if (input.whereFilter) {
    sql += ` WHERE ${input.whereFilter}`;
  }

  sql += ` GROUP BY 1`;
  sql += ` ORDER BY 1 ASC`;
  return sql;
}

router.get('/metrics/_data', async (req, res) => {
  const params = req.query;
  const sql = constructChartSQL(params);

  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(data => {
    res.send({
      sql,
      data,
    });
  });
});

module.exports = router;
