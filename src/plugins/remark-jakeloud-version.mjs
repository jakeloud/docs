import { JAKELOUD_VERSION } from '../constants.mjs';

// Resolve the placeholder before code highlighting, in both Markdown and MDX.
export default function remarkJakeloudVersion() {
  return function transform(tree) {
    function visit(node) {
      for (const key of ['value', 'meta', 'url']) {
        if (typeof node[key] === 'string') {
          node[key] = node[key].replaceAll('%JAKELOUD_VERSION%', JAKELOUD_VERSION);
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
