import { ColumnI } from "../interfaces/column";
import { DataTableI } from "../interfaces/dataTable";

import { getName } from "../lib/getNames.js";

const getT = (names: string[]) => {
  const tabsCount = names.map((name) => Math.ceil(name.length / 4));

  const lettersCount = names.map((name) => name.length);

  const maxTabs = getMaxTabs(tabsCount, lettersCount);

  return { tabsCount, lettersCount, maxTabs };
};

export const template = (table: DataTableI): string[] => {
  const columns = table.columns.map((col) => {
    return {
      name: col.name,
      type: col.type === "number" ? "int" : col.type,
      default: col.default,
      length: col.length,
      nullable: col.nullable,
      unique: col.unique,
    };
  });

  const body: string[] = [];
  const {
    tabsCount: columnsLength,
    lettersCount: columnsLengthD,
    maxTabs: maxTabsCols,
  } = getT(columns.map((col) => col.name));

  const {
    tabsCount: tabsLength,
    lettersCount: tabsLengthD,
    maxTabs: maxTabsTypes,
  } = getT(columns.map((col) => col.type));

  columns.map((col: ColumnI) => {
    const tabsRequired = columnsLength.shift();
    const tabsRequiredD = columnsLengthD.shift();

    const tabsRequiredT = tabsLength.shift();
    const tabsRequiredDT = tabsLengthD.shift();

    if (tabsRequired && tabsRequiredD && tabsRequiredT && tabsRequiredDT) {
      const tabs =
        maxTabsCols - tabsRequired + (tabsRequiredD % 4 === 0 ? 0 : 1);

      let tabsT =
        maxTabsTypes - tabsRequiredT + (tabsRequiredDT % 4 === 0 ? 0 : 1);
      if (
        columns.map((col) => col.type.length % 4 === 0).includes(true) &&
        col.type.length % 4 !== 0
      ) {
        tabsT++;
      }

      const t = Array(tabs)
        .fill(1)
        .map(() => "\t")
        .join("");

      const tt = Array(tabsT)
        .fill(1)
        .map(() => "\t")
        .join("");

      body.push(
        `\t${col.name}${t}${getColType(col.type)}${isNull(
          col
        )}${tt}${getProperties(col, table.primary)}`
      );
    }
  });

  return body;
};

const getProperties = (col: ColumnI, primary: string): string => {
  let str: string[] = [];

  str = str.concat(
    isPrimary(primary, col) ? ["@id @default(autoincrement())"] : [""]
  );
  str = str.concat(isDefault(col));
  str = str.concat(isUnique(col));

  str = str.filter((s) => s.length > 0);
  return str.join(" ");
};

const getColType = (type: string) => {
  return type === "number"
    ? "Int"
    : type === "Date"
    ? "DateTime"
    : getName(type);
};

const getMaxTabs = (columnsLength: number[], columnsLengthD: number[]) => {
  const maxTabs =
    Math.max(...columnsLength) +
    (Math.max(...columnsLengthD) % 4 === 0 ? 1 : 0);

  return maxTabs;
};

const isPrimary = (primary: string, col: ColumnI): boolean => {
  return primary === col.name ? true : false;
};

const isNull = (col: ColumnI): string => {
  return typeof col.nullable === "boolean" ? "?" : "";
};

const isDefault = (col: ColumnI): string[] => {
  if (typeof col.default !== "undefined") {
    let str = ["@default("];
    if (col.type === "string") {
      str = str.concat('"');
    }
    if (col.type === "Date") {
      str = str.concat("now()");
    } else {
      str = str.concat(col.default.toString());
    }
    if (col.type === "string") {
      str = str.concat('"');
    }
    str = str.concat(")");

    return [str.join("")];
  }

  return [];
};

const isUnique = (col: ColumnI): string[] => {
  return typeof col.unique === "boolean" ? ["@unique"] : [];
};

const length = (col: ColumnI): string[] => {
  return typeof col.length === "number" && col.type === "string"
    ? [`type: "varchar", length: ${col.length}`]
    : [];
};
