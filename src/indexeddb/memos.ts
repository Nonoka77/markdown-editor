import Dexie from "dexie";

const NUM_PER_PAGE:number = 10;

export const getMemoPageCount = async():Promise<number> => {
    const totalCount = await memos.count()
    const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)
    return pageCount > 0 ? pageCount: 1
}

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

export const getMemos = (page:number):Promise<MemoRecord[]> => {
    const offset = (page -1 ) * NUM_PER_PAGE
    return memos.orderBy("datetime") //昇順に取得
    .reverse() //降順に並び替え
    .offset(offset) //開始位置
    .limit(NUM_PER_PAGE) //表示件数の上限
    .toArray() //取得したデータを配列に変換して返却
}