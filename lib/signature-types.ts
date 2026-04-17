/** Served from this app (`/public`) so Gmail/Outlook always get a stable https URL. */
export const DYNAMATIX_LOGO_PATH = "/dynamatix-logo.png";
export const DYNAMATIX_LOGO_ALT = "Dynamatix";

export type SignatureConfig = {
  accentBar: {
    teal: string;
    orange: string;
    lime: string;
    brown: string;
  };
  closingLine: string;
  fullName: string;
  jobTitle: string;
  photoUrl: string;
  photoAlt: string;
  websiteUrl: string;
  websiteLabel: string;
  linkedinUrl: string;
  linkedinLabel: string;
  legalCompanyName: string;
  legalRegistrationLine: string;
  legalAddressLine: string;
  confidentialityTitle: string;
  confidentialityBody: string;
  brandTeal: string;
};

export const defaultSignatureConfig: SignatureConfig = {
  accentBar: {
    teal: "#2ba2b8",
    orange: "#e67540",
    lime: "#a4c93a",
    brown: "#6a3b2f",
  },
  closingLine: "Best regards",
  fullName: "Likhithram",
  jobTitle: "Solution Lead",
  photoUrl: "",
  photoAlt: "Profile photo",
  websiteUrl: "https://www.dynamatix.com/",
  websiteLabel: "dynamatix.com",
  linkedinUrl: "https://www.linkedin.com/company/dynamatix",
  linkedinLabel: "Follow us on LinkedIn",
  legalCompanyName: "Dynamatix Limited",
  legalRegistrationLine:
    "Registered in England & Wales · No. 8575927",
  legalAddressLine: "20–22 Wenlock Road, London, England, N1 7GU",
  confidentialityTitle: "Confidentiality Notice",
  confidentialityBody:
    "This email and any attachments are intended solely for the named recipient. If received in error, please notify the sender and delete immediately.",
  brandTeal: "#2ba2b8",
};
