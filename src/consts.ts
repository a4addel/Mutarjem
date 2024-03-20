import { path } from "@tauri-apps/api";

export const Motarjem = "Motarjem";
export const projects = "projects";
export const metaFileName = "meta.text"
export const textFileName = "text.text"
export const Auth = "Auth"
export const AuthLink = "Link.text"
export const Authkey = "Key.text"

export function listProjectsPath() {
    return path.join(Motarjem, projects);
}

export function ProjectMetaPath(id: string) {
    return path.join(Motarjem, projects, id, metaFileName);
}

export function ProjectPath(id: string) {
    return path.join(Motarjem, projects, id);
}
export function ProjectTextPath(id: string) {
    return path.join(Motarjem, projects, id, textFileName);
}

export function AUTHPath() {
    return path.join(Motarjem, Auth);
}
 
export function AUTHL_LinkPath() {
    return path.join(Motarjem, Auth, AuthLink);
}
 
 
export function AUTHL_KeyPath() {
    return path.join(Motarjem, Auth, Authkey);
}
 
