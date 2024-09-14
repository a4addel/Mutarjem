import { path } from "@tauri-apps/api";

export const Mutarjem = "Mutarjem";
export const projects = "projects";
export const metaFileName = "meta.text";
export const textFileName = "text.text";
export const Auth = "Auth";
export const AuthLink = "Link.text";
export const Authkey = "Key.text";

export function listProjectsPath() {
  return path.join(Mutarjem, projects);
}

export function ProjectMetaPath(id: string) {
  return path.join(Mutarjem, projects, id, metaFileName);
}

export function ProjectPath(id: string) {
  return path.join(Mutarjem, projects, id);
}
export function ProjectTextPath(id: string) {
  return path.join(Mutarjem, projects, id, textFileName);
}

export function AUTHPath() {
  return path.join(Mutarjem, Auth);
}

export function AUTHL_LinkPath() {
  return path.join(Mutarjem, Auth, AuthLink);
}

export function AUTHL_KeyPath() {
  return path.join(Mutarjem, Auth, Authkey);
}
