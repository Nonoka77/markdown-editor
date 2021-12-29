import Dexie from "dexie";

export interface MemoRecord {
    datetime: string
    title: string
    text: string
}

const database = new Dexie('markdown-editor')
database.version(1).stores({memos: '&datetime'}) //テーブルとインデックスとなるデータ名を指定
const memos:Dexie.Table<MemoRecord, string> = database.table('memos') //データを扱うテーブルクラスを取得
// MemoRecordはデータの型
// 2つ目の string はキーとなるデータ（今回は datetime）の型

//保存するための関数
export const putMemo = async(title: string, text: string): Promise<void> => {
    const datetime = new Date().toISOString() //保存のタイミングで自動的に付与
    await memos.put({datetime, title, text})
}