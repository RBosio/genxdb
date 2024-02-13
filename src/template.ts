import { tableDataI } from ".";

export const template = (table: tableDataI) => `${table.columns.map((col) => {
  return ` 
    ${table.primary === col.name ? "@PrimaryGeneratedColumn()" : "@Column()"}
    ${col.name}: ${col.type}
`;
})}
  `;
