export const downloadTemplateFileFromServer = async (
  url: string,
  token?: string
) => {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` || "" },
  });

  const blob = await response.blob();

  const fileurl = window.URL.createObjectURL(new Blob([blob]));

  const link = document.createElement("a");

  link.href = fileurl;
  link.setAttribute("download", "template.xlsx");
  link.target = "_blank";

  link.click();
};
