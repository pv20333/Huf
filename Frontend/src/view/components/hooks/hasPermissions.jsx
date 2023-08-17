import { parseJwt } from "../../pages/login/token";

export function isIT() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedJwt = parseJwt(token);
    if (!decodedJwt || !decodedJwt.departmentNumber) return false;

    if(decodedJwt.departmentNumber == "IT") return true;
    return false;
}

export function isQuality() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedJwt = parseJwt(token);
    if (!decodedJwt || !decodedJwt.departmentNumber) return false;

    if(decodedJwt.departmentNumber == "Quality") return true;
    return false;
}

export function isCollaborator() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decodedJwt = parseJwt(token);
    if (!decodedJwt || !decodedJwt.departmentNumber) return false;

    if(decodedJwt.departmentNumber == "Collaborator") return true;
    return false;
}