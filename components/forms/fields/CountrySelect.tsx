import React, { FC, ReactElement } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { FieldInputProps, useFormikContext } from "formik";

export const countries = [
  { name: "Afghanistan", iso3: "afg", phoneCode: "+93", iso: "af" },
  { name: "Albania", iso3: "alb", phoneCode: "+355", iso: "al" },
  { name: "Algeria", iso3: "dza", phoneCode: "+213", iso: "dz" },
  { name: "Andorra", iso3: "and", phoneCode: "+376", iso: "ad" },
  { name: "Angola", iso3: "ago", phoneCode: "+244", iso: "ao" },
  { name: "Argentina", iso3: "arg", phoneCode: "+54", iso: "ar" },
  { name: "Armenia", iso3: "arm", phoneCode: "+374", iso: "am" },
  { name: "Australia", iso3: "aus", phoneCode: "+61", iso: "au" },
  { name: "Austria", iso3: "aut", phoneCode: "+43", iso: "at" },
  { name: "Azerbaijan", iso3: "aze", phoneCode: "+994", iso: "az" },
  { name: "Bahamas", iso3: "bhs", phoneCode: "+1-242", iso: "bs" },
  { name: "Bahrain", iso3: "bhr", phoneCode: "+973", iso: "bh" },
  { name: "Bangladesh", iso3: "bgd", phoneCode: "+880", iso: "bd" },
  { name: "Barbados", iso3: "brb", phoneCode: "+1-246", iso: "bb" },
  { name: "Belarus", iso3: "blr", phoneCode: "+375", iso: "by" },
  { name: "Belgium", iso3: "bel", phoneCode: "+32", iso: "be" },
  { name: "Belize", iso3: "blz", phoneCode: "+501", iso: "bz" },
  { name: "Benin", iso3: "ben", phoneCode: "+229", iso: "bj" },
  { name: "Bhutan", iso3: "btn", phoneCode: "+975", iso: "bt" },
  { name: "Bolivia", iso3: "bol", phoneCode: "+591", iso: "bo" },
  { name: "Bosnia and Herzegovina", iso3: "bih", phoneCode: "+387", iso: "ba" },
  { name: "Botswana", iso3: "bwa", phoneCode: "+267", iso: "bw" },
  { name: "Brazil", iso3: "bra", phoneCode: "+55", iso: "br" },
  { name: "Brunei", iso3: "brn", phoneCode: "+673", iso: "bn" },
  { name: "Bulgaria", iso3: "bgr", phoneCode: "+359", iso: "bg" },
  { name: "Burkina Faso", iso3: "bfa", phoneCode: "+226", iso: "bf" },
  { name: "Burundi", iso3: "bdi", phoneCode: "+257", iso: "bi" },
  { name: "Cabo Verde", iso3: "cpv", phoneCode: "+238", iso: "cv" },
  { name: "Cambodia", iso3: "khm", phoneCode: "+855", iso: "kh" },
  { name: "Cameroon", iso3: "cmr", phoneCode: "+237", iso: "cm" },
  { name: "Canada", iso3: "can", phoneCode: "+1", iso: "ca" },
  {
    name: "Central African Republic",
    iso3: "caf",
    phoneCode: "+236",
    iso: "cf",
  },
  { name: "Chad", iso3: "tcd", phoneCode: "+235", iso: "td" },
  { name: "Chile", iso3: "chl", phoneCode: "+56", iso: "cl" },
  { name: "China", iso3: "chn", phoneCode: "+86", iso: "cn" },
  { name: "Colombia", iso3: "col", phoneCode: "+57", iso: "co" },
  { name: "Comoros", iso3: "com", phoneCode: "+269", iso: "km" },
  {
    name: "Congo, Democratic Republic of the",
    iso3: "cod",
    phoneCode: "+243",
    iso: "cd",
  },
  { name: "Congo, Republic of the", iso3: "cog", phoneCode: "+242", iso: "cg" },
  { name: "Costa Rica", iso3: "cri", phoneCode: "+506", iso: "cr" },
  { name: "Croatia", iso3: "hrv", phoneCode: "+385", iso: "hr" },
  { name: "Cuba", iso3: "cub", phoneCode: "+53", iso: "cu" },
  { name: "Cyprus", iso3: "cyp", phoneCode: "+357", iso: "cy" },
  { name: "Czech Republic", iso3: "cze", phoneCode: "+420", iso: "cz" },
  { name: "Denmark", iso3: "dnk", phoneCode: "+45", iso: "dk" },
  { name: "Djibouti", iso3: "dji", phoneCode: "+253", iso: "dj" },
  { name: "Dominica", iso3: "dma", phoneCode: "+1-767", iso: "dm" },
  { name: "Dominican Republic", iso3: "dom", phoneCode: "+1-809", iso: "do" },
  { name: "Ecuador", iso3: "ecu", phoneCode: "+593", iso: "ec" },
  { name: "Egypt", iso3: "egy", phoneCode: "+20", iso: "eg" },
  { name: "El Salvador", iso3: "slv", phoneCode: "+503", iso: "sv" },
  { name: "Equatorial Guinea", iso3: "gnq", phoneCode: "+240", iso: "gq" },
  { name: "Eritrea", iso3: "eri", phoneCode: "+291", iso: "er" },
  { name: "Estonia", iso3: "est", phoneCode: "+372", iso: "ee" },
  { name: "Eswatini", iso3: "swz", phoneCode: "+268", iso: "sz" },
  { name: "Ethiopia", iso3: "eth", phoneCode: "+251", iso: "et" },
  { name: "Fiji", iso3: "fji", phoneCode: "+679", iso: "fj" },
  { name: "Finland", iso3: "fin", phoneCode: "+358", iso: "fi" },
  { name: "France", iso3: "fra", phoneCode: "+33", iso: "fr" },
  { name: "Gabon", iso3: "gab", phoneCode: "+241", iso: "ga" },
  { name: "Gambia", iso3: "gmb", phoneCode: "+220", iso: "gm" },
  { name: "Georgia", iso3: "geo", phoneCode: "+995", iso: "ge" },
  { name: "Germany", iso3: "deu", phoneCode: "+49", iso: "de" },
  { name: "Ghana", iso3: "gha", phoneCode: "+233", iso: "gh" },
  { name: "Greece", iso3: "grc", phoneCode: "+30", iso: "gr" },
  { name: "Grenada", iso3: "grd", phoneCode: "+1-473", iso: "gd" },
  { name: "Guatemala", iso3: "gtm", phoneCode: "+502", iso: "gt" },
  { name: "Guinea", iso3: "gin", phoneCode: "+224", iso: "gn" },
  { name: "Guinea-Bissau", iso3: "gnb", phoneCode: "+245", iso: "gw" },
  { name: "Guyana", iso3: "guy", phoneCode: "+592", iso: "gy" },
  { name: "Haiti", iso3: "hti", phoneCode: "+509", iso: "ht" },
  { name: "Honduras", iso3: "hnd", phoneCode: "+504", iso: "hn" },
  { name: "Hungary", iso3: "hun", phoneCode: "+36", iso: "hu" },
  { name: "Iceland", iso3: "isl", phoneCode: "+354", iso: "is" },
  { name: "India", iso3: "ind", phoneCode: "+91", iso: "in" },
  { name: "Indonesia", iso3: "idn", phoneCode: "+62", iso: "id" },
  { name: "Iran", iso3: "irn", phoneCode: "+98", iso: "ir" },
  { name: "Iraq", iso3: "irq", phoneCode: "+964", iso: "iq" },
  { name: "Ireland", iso3: "irl", phoneCode: "+353", iso: "ie" },
  { name: "Israel", iso3: "isr", phoneCode: "+972", iso: "il" },
  { name: "Italy", iso3: "ita", phoneCode: "+39", iso: "it" },
  { name: "Jamaica", iso3: "jam", phoneCode: "+1-876", iso: "jm" },
  { name: "Japan", iso3: "jpn", phoneCode: "+81", iso: "jp" },
  { name: "Jordan", iso3: "jor", phoneCode: "+962", iso: "jo" },
  { name: "Kazakhstan", iso3: "kaz", phoneCode: "+7", iso: "kz" },
  { name: "Kenya", iso3: "ken", phoneCode: "+254", iso: "ke" },
  { name: "Kiribati", iso3: "kir", phoneCode: "+686", iso: "ki" },
  { name: "Korea, North", iso3: "prk", phoneCode: "+850", iso: "kp" },
  { name: "Korea, South", iso3: "kor", phoneCode: "+82", iso: "kr" },
  { name: "Kuwait", iso3: "kwt", phoneCode: "+965", iso: "kw" },
  { name: "Kyrgyzstan", iso3: "kgz", phoneCode: "+996", iso: "kg" },
  { name: "Laos", iso3: "lao", phoneCode: "+856", iso: "la" },
  { name: "Latvia", iso3: "lva", phoneCode: "+371", iso: "lv" },
  { name: "Lebanon", iso3: "lbn", phoneCode: "+961", iso: "lb" },
  { name: "Lesotho", iso3: "lso", phoneCode: "+266", iso: "ls" },
  { name: "Liberia", iso3: "lbr", phoneCode: "+231", iso: "lr" },
  { name: "Libya", iso3: "lby", phoneCode: "+218", iso: "ly" },
  { name: "Liechtenstein", iso3: "lie", phoneCode: "+423", iso: "li" },
  { name: "Lithuania", iso3: "ltu", phoneCode: "+370", iso: "lt" },
  { name: "Luxembourg", iso3: "lux", phoneCode: "+352", iso: "lu" },
  { name: "Madagascar", iso3: "mdg", phoneCode: "+261", iso: "mg" },
  { name: "Malawi", iso3: "mwi", phoneCode: "+265", iso: "mw" },
  { name: "Malaysia", iso3: "mys", phoneCode: "+60", iso: "my" },
  { name: "Maldives", iso3: "mdv", phoneCode: "+960", iso: "mv" },
  { name: "Mali", iso3: "mli", phoneCode: "+223", iso: "ml" },
  { name: "Malta", iso3: "mlt", phoneCode: "+356", iso: "mt" },
  { name: "Marshall Islands", iso3: "mhl", phoneCode: "+692", iso: "mh" },
  { name: "Mauritania", iso3: "mrt", phoneCode: "+222", iso: "mr" },
  { name: "Mauritius", iso3: "mus", phoneCode: "+230", iso: "mu" },
  { name: "Mexico", iso3: "mex", phoneCode: "+52", iso: "mx" },
  { name: "Micronesia", iso3: "fsm", phoneCode: "+691", iso: "fm" },
  { name: "Moldova", iso3: "mda", phoneCode: "+373", iso: "md" },
  { name: "Monaco", iso3: "mco", phoneCode: "+377", iso: "mc" },
  { name: "Mongolia", iso3: "mng", phoneCode: "+976", iso: "mn" },
  { name: "Montenegro", iso3: "mne", phoneCode: "+382", iso: "me" },
  { name: "Morocco", iso3: "mar", phoneCode: "+212", iso: "ma" },
  { name: "Mozambique", iso3: "moz", phoneCode: "+258", iso: "mz" },
  { name: "Myanmar", iso3: "mmr", phoneCode: "+95", iso: "mm" },
  { name: "Namibia", iso3: "nam", phoneCode: "+264", iso: "na" },
  { name: "Nauru", iso3: "nru", phoneCode: "+674", iso: "nr" },
  { name: "Nepal", iso3: "npl", phoneCode: "+977", iso: "np" },
  { name: "Netherlands", iso3: "nld", phoneCode: "+31", iso: "nl" },
  { name: "New Zealand", iso3: "nzl", phoneCode: "+64", iso: "nz" },
  { name: "Nicaragua", iso3: "nic", phoneCode: "+505", iso: "ni" },
  { name: "Niger", iso3: "ner", phoneCode: "+227", iso: "ne" },
  { name: "Nigeria", iso3: "nga", phoneCode: "+234", iso: "ng" },
  { name: "North Macedonia", iso3: "mkd", phoneCode: "+389", iso: "mk" },
  { name: "Norway", iso3: "nor", phoneCode: "+47", iso: "no" },
  { name: "Oman", iso3: "omn", phoneCode: "+968", iso: "om" },
  { name: "Pakistan", iso3: "pak", phoneCode: "+92", iso: "pk" },
  { name: "Palau", iso3: "plw", phoneCode: "+680", iso: "pw" },
  { name: "Panama", iso3: "pan", phoneCode: "+507", iso: "pa" },
  { name: "Papua New Guinea", iso3: "png", phoneCode: "+675", iso: "pg" },
  { name: "Paraguay", iso3: "pry", phoneCode: "+595", iso: "py" },
  { name: "Peru", iso3: "per", phoneCode: "+51", iso: "pe" },
  { name: "Philippines", iso3: "phl", phoneCode: "+63", iso: "ph" },
  { name: "Poland", iso3: "pol", phoneCode: "+48", iso: "pl" },
  { name: "Portugal", iso3: "prt", phoneCode: "+351", iso: "pt" },
  { name: "Qatar", iso3: "qat", phoneCode: "+974", iso: "qa" },
  { name: "Romania", iso3: "rou", phoneCode: "+40", iso: "ro" },
  { name: "Russia", iso3: "rus", phoneCode: "+7", iso: "ru" },
  { name: "Rwanda", iso3: "rwa", phoneCode: "+250", iso: "rw" },
  {
    name: "Saint Kitts and Nevis",
    iso3: "kna",
    phoneCode: "+1-869",
    iso: "kn",
  },
  { name: "Saint Lucia", iso3: "lca", phoneCode: "+1-758", iso: "lc" },
  {
    name: "Saint Vincent and the Grenadines",
    iso3: "vct",
    phoneCode: "+1-784",
    iso: "vc",
  },
  { name: "Samoa", iso3: "wsm", phoneCode: "+685", iso: "ws" },
  { name: "San Marino", iso3: "smr", phoneCode: "+378", iso: "sm" },
  { name: "Sao Tome and Principe", iso3: "stp", phoneCode: "+239", iso: "st" },
  { name: "Saudi Arabia", iso3: "sau", phoneCode: "+966", iso: "sa" },
  { name: "Senegal", iso3: "sen", phoneCode: "+221", iso: "sn" },
  { name: "Serbia", iso3: "srb", phoneCode: "+381", iso: "rs" },
  { name: "Seychelles", iso3: "syc", phoneCode: "+248", iso: "sc" },
  { name: "Sierra Leone", iso3: "sle", phoneCode: "+232", iso: "sl" },
  { name: "Singapore", iso3: "sgp", phoneCode: "+65", iso: "sg" },
  { name: "Slovakia", iso3: "svk", phoneCode: "+421", iso: "sk" },
  { name: "Slovenia", iso3: "svn", phoneCode: "+386", iso: "si" },
  { name: "Solomon Islands", iso3: "slb", phoneCode: "+677", iso: "sb" },
  { name: "Somalia", iso3: "som", phoneCode: "+252", iso: "so" },
  { name: "South Africa", iso3: "zaf", phoneCode: "+27", iso: "za" },
  { name: "South Sudan", iso3: "ssd", phoneCode: "+211", iso: "ss" },
  { name: "Spain", iso3: "esp", phoneCode: "+34", iso: "es" },
  { name: "Sri Lanka", iso3: "lka", phoneCode: "+94", iso: "lk" },
  { name: "Sudan", iso3: "sdn", phoneCode: "+249", iso: "sd" },
  { name: "Suriname", iso3: "sur", phoneCode: "+597", iso: "sr" },
  { name: "Sweden", iso3: "swe", phoneCode: "+46", iso: "se" },
  { name: "Switzerland", iso3: "che", phoneCode: "+41", iso: "ch" },
  { name: "Syria", iso3: "syr", phoneCode: "+963", iso: "sy" },
  { name: "Taiwan", iso3: "twn", phoneCode: "+886", iso: "tw" },
  { name: "Tajikistan", iso3: "tjk", phoneCode: "+992", iso: "tj" },
  { name: "Tanzania", iso3: "tza", phoneCode: "+255", iso: "tz" },
  { name: "Thailand", iso3: "tha", phoneCode: "+66", iso: "th" },
  { name: "Timor-Leste", iso3: "tls", phoneCode: "+670", iso: "tl" },
  { name: "Togo", iso3: "tgo", phoneCode: "+228", iso: "tg" },
  { name: "Tonga", iso3: "ton", phoneCode: "+676", iso: "to" },
  { name: "Trinidad and Tobago", iso3: "tto", phoneCode: "+1-868", iso: "tt" },
  { name: "Tunisia", iso3: "tun", phoneCode: "+216", iso: "tn" },
  { name: "Turkey", iso3: "tur", phoneCode: "+90", iso: "tr" },
  { name: "Turkmenistan", iso3: "tkm", phoneCode: "+993", iso: "tm" },
  { name: "Tuvalu", iso3: "tuv", phoneCode: "+688", iso: "tv" },
  { name: "Uganda", iso3: "uga", phoneCode: "+256", iso: "ug" },
  { name: "Ukraine", iso3: "ukr", phoneCode: "+380", iso: "ua" },
  { name: "United Arab Emirates", iso3: "are", phoneCode: "+971", iso: "ae" },
  { name: "United Kingdom", iso3: "gbr", phoneCode: "+44", iso: "gb" },
  { name: "United States", iso3: "usa", phoneCode: "+1", iso: "us" },
  { name: "Uruguay", iso3: "ury", phoneCode: "+598", iso: "uy" },
  { name: "Uzbekistan", iso3: "uzb", phoneCode: "+998", iso: "uz" },
  { name: "Vanuatu", iso3: "vut", phoneCode: "+678", iso: "vu" },
  { name: "Vatican City", iso3: "vat", phoneCode: "+379", iso: "va" },
  { name: "Venezuela", iso3: "ven", phoneCode: "+58", iso: "ve" },
  { name: "Vietnam", iso3: "vnm", phoneCode: "+84", iso: "vn" },
  { name: "Yemen", iso3: "yem", phoneCode: "+967", iso: "ye" },
  { name: "Zambia", iso3: "zmb", phoneCode: "+260", iso: "zm" },
  { name: "Zimbabwe", iso3: "zwe", phoneCode: "+263", iso: "zw" },
];

interface CountrySelectProps {
  elementProps: FieldInputProps<any>;
  error?: string;
}

const CountrySelect: FC<CountrySelectProps> = ({
  elementProps,
  error,
}): ReactElement => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext();

  return (
    <Autocomplete
      fullWidth
      id="country-select"
      options={countries}
      componentsProps={{
        popper: { sx: { maxHeight: "30px" } },
        paper: { sx: { maxHeight: "200px" } },
      }}
      onChange={(e, data) => setFieldValue("country", data)}
      renderOption={(props, item) => (
        <li
          {...props}
          key={item.name}
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
          <Image
            width="32"
            height="32"
            alt={item?.iso3}
            loading="lazy"
            src={`https://flagsapi.com/${item.iso.toUpperCase()}/shiny/32.png`}
          />
          <Typography>{item.name}</Typography>
        </li>
      )}
      getOptionLabel={(option: any) => `${t(option.name)}`}
      renderInput={(params: any) => (
        <TextField
          {...elementProps}
          {...params}
          error={!!error}
          helperText={
            <Typography color="error" textAlign="right" variant="body2">
              {error ?? ""}
            </Typography>
          }
        />
      )}
      noOptionsText={t("noResultsFound")}
    />
  );
};

export default CountrySelect;
