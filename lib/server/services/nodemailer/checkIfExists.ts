const cpanelUser = "pikadone";
const cpanelPassword = "n4w55S9;rkXD*U";
const cpanelUrl = "https://sv95.ifastnet.com:2083/";
const domain = "pikado.net"

export const checkEmailExists = async (email: string) => {
  const params = new URLSearchParams();
  params.append("domain", domain);

  const response = await fetch(
    `${cpanelUrl}/execute/Email/list_pops?${params}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${cpanelUser}:${cpanelPassword}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  const data = await response.json();
  if (data.errors && data.errors.length > 0) {
    console.error("Error:", data.errors);
    return false;
  } else {
    const emailAccounts = data.data as { email: string }[];
    return emailAccounts.some((acc) => acc.email === `${email}@${domain}`);
  }
};
