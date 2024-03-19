import { path } from "@tauri-apps/api";

const Motarjem = "Motarjem";
const projects = "projects";
const metaFileName = "meta.text"
const textFileName = "text.text"

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