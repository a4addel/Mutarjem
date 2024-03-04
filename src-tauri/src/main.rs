
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::fs;

 
use std::fs::OpenOptions;
use std::io::prelude::*;

#[tauri::command]
fn save(text: &str, name: &str) {

     
} 



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
