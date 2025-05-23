import type { Rspack } from '@rsbuild/core';
import { REACT_DIRECTIVE_REGEX, SHEBANG_REGEX } from '../constant';

function splitFromFirstLine(text: string): [string, string] {
  const match = text.match(/(\r\n|\n)/);
  if (!match) {
    return [text, ''];
  }

  return [text.slice(0, match.index), text.slice(match.index)];
}

const loader: Rspack.LoaderDefinition = function loader(source) {
  let result = source;

  const [firstLine1, rest] = splitFromFirstLine(result);

  if (SHEBANG_REGEX.test(firstLine1)) {
    result = rest;
  }

  const [firstLine2, rest2] = splitFromFirstLine(result);
  if (REACT_DIRECTIVE_REGEX.test(firstLine2)) {
    result = rest2;
  }

  return result;
};

export default loader;
