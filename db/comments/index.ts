import { query } from "..";
import { UserType } from "../users";

export interface CommentType {
  _id: number;
  comment: string;
  createdBy: UserType;
  parent: number;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentCreateType {
  comment: string;
  createdBy: number;
  parent: number;
}

export interface DBCommentType extends Omit<CommentType, "createdBy"> {
  createdBy: string;
}

const tableName = "comments";

export const createNewComment = async (data: CommentCreateType) => {
  try {
    const { insertId } = (await query(
      `INSERT INTO ${tableName} (
        comment,
        createdBy,
        parent
        ) VALUES?`,
      [[data.comment, data.createdBy, data.parent]]
    )) as { insertId: number };
    console.log("NEW COMMENT CREATED: " + insertId);
    return insertId;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedComments = async (
  count: string,
  parent: string
): Promise<{
  data: CommentType[];
  total: number;
}> => {
  try {
    const total = await query<[{ total: number }]>(
      `SELECT COUNT(*) AS total FROM ${tableName} WHERE parent = ?`,
      [[parent]]
    );

    const data = await query<DBCommentType[]>(`
      SELECT 
        comments._id,
        comments.edited,
        JSON_OBJECT(
          '_id', users._id,
          'firstName', users.firstName,
          'lastName', users.lastName
        ) AS createdBy,
        comments.createdAt,
        comments.comment
        FROM ${tableName}
        JOIN users ON comments.createdBy = users._id
        WHERE comments.parent = ${parent} 
        ORDER BY comments._id DESC 
        LIMIT ${count};
        `);
    const formattedResults = data.map((row) => ({
      _id: row._id,
      createdBy: JSON.parse(row.createdBy),
      createdAt: row.createdAt,
      comment: row.comment,
      edited: row.edited,
    })) as CommentType[];
    return { data: formattedResults, total: total?.[0]?.total ?? 0 };
  } catch (error) {
    throw error;
  }
};

export const removeComment = async (_id: string): Promise<any> => {
  try {
    await query(`DELETE FROM ${tableName} WHERE _id = ${_id}`);
    return true;
  } catch (error) {
    throw error;
  }
};
