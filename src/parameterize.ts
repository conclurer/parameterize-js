import {ParameterizeOptions} from "./interfaces/parameterize-options";
import {DEFAULT_DOWNCODER} from "./helper/downcoder";

export default function parameterize(input: string, options: ParameterizeOptions = {}) {
  const maxLength = options.maxLength;
  const separator = options.separator || '-';
  const downcoder = options.downcoder || DEFAULT_DOWNCODER;

  return downcoder.apply(input)
    .replace(/[^-\w\s\u4E00-\u9FA5]/g, '') // remove unneeded chars
    .replace(/^\s+|\s+$/g, '') // trim leading/trailing spaces
    .replace(/[-\s]+/g, separator) // convert spaces to hyphens
    .toLowerCase() // convert to lowercase
    .substring(0, maxLength); // trim to first num_chars chars
}
