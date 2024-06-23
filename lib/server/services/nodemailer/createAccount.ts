export const createEmailAccount = async (
  email: string,
  password: string,
  quota: string
) => {
  const cpanelUser = "pikadone";
  const cpanelPassword = "n4w55S9;rkXD*U";
  const cpanelUrl = "https://sv95.ifastnet.com:2083/"; // Use the appropriate URL and port
  const domain = "pikado.net";
//   
  const params = new URLSearchParams();
  params.append("cpanel_jsonapi_user", cpanelUser);
  params.append("cpanel_jsonapi_apiversion", "3");
  params.append("cpanel_jsonapi_module", "Email");
  params.append("cpanel_jsonapi_func", "add_pop");
  params.append("domain", domain);
  params.append("email", email);
  params.append("password", password);
  params.append("quota", quota); // Quota in MB, use 0 for unlimited

  try {
    const response = await fetch(`${cpanelUrl}/json-api/cpanel`, {
      method: "POST",
      body: params,
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${cpanelUser}:${cpanelPassword}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.cpanelresult.error) {
      console.error("Error:", data.cpanelresult.error);
    } else {
      console.log("Email account created successfully.");
    }
  } catch (error) {
    console.error("Error creating email account:", error);
  }
};

// Usage
// createEmailAccount("pikado.net", "neotech", "password123", "100");
