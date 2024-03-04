import { createDir, BaseDirectory } from '@tauri-apps/api/fs';
import { useState } from 'react';


export default function setPath() {
    const [path, setPathDir] = useState("");

    function  handlePath(path: string) {
        setPathDir(path)
    }
    return <>
    
    
    </>
}