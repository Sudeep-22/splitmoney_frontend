import { fetchWithAuth } from "../fetchWithAuth";
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGroup = async () => {
  const res = await fetchWithAuth(
    `${apiUrl}/group/fetchGroup`,
    {
      method: "POST",
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch group");
  return json;
};

export const fetchMembers = async (data: { groupId: string }) => {
  const res = await fetchWithAuth(
    `${apiUrl}/group/fetchMembers`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to fetch members");
  return json;
};

export const createGroup = async (data: {
  title: string;
  description: string;
}) => {
  const res = await fetchWithAuth(
    `${apiUrl}/group/createGroup`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create group");
  return json;
};

export const addMember = async (data: { name: string; groupId: string }) => {
  const res = await fetchWithAuth(`${apiUrl}/group/addMember`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to add member");
  return json;
};

export const exitGroup = async (data: { groupId: string }) => {
  const res = await fetchWithAuth(`${apiUrl}/group/exitGroup`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to exit group");
  return json;
};
