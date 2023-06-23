import { Md5 } from "ts-md5";
const p_key = "6270c7a7851c6755007a0296770f05917455afb5";
const pub_key = "7620c866f7a8251c6aebeb639562c510";

export const getAuthString = () => {
  const ts = Date.now();
  //md5(ts+privateKey+publicKey)
  const hash = Md5.hashStr(ts + p_key + pub_key);
  return { pub_key, p_key, ts, hash };
};
