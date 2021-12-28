import {useState} from "react"

export const useStateWithStorage = (init: string, key: string):[string, (s: string) => void] => {
    const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

    const setValueWithStorage = (nextValue: string):void => { //setするだけで何も値を返さないからvoid
        setValue(nextValue)
        localStorage.setItem(key, nextValue)
    }
    return [value, setValueWithStorage]
}


// useStateWithStorageの戻り値[string, (s: string) => void]について
// 関数useStateWithStorageは返り値が配列である。
// その返り値(配列)の2番めの要素は関数setValueWithStorageである。
// 関数setValueWithStorageは引数にstring型を指定しており、返り値はない関数である。