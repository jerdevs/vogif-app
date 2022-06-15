/* eslint-disable */

const template = (
  { template },
  opts,
  { imports, componentName, props, jsx, exports }
) => {
  const typeScriptTpl = template.smart({ plugins: ["typescript"] });
  return typeScriptTpl.ast`
    /* eslint-disable */
    import * as React from "react";
    const ${componentName} = (props: React.SVGProps<SVGSVGElement>): React.ReactElement => ${jsx};
    export default ${componentName};
  `;
};

export default template;
