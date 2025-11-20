export const fetchUsers = async () => {
    const res=await fetch("http://localhost:8080/users");
    const data=await res.json();
    return data._embedded ? data._embedded.users : [];
}

export const getParentsId = (user) =>{
    if(!user.reportingTo) return null;
    const parts=user.reportingTo.href.split("/");
    return parseInt(parts[parts.length-1]);
}