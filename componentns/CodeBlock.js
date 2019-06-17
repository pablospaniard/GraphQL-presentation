import React from 'react'
import { UnControlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
import '../cm-night-owl.css'
import '../styles.css'

const CodeBlock = ({ code, options = {}, style, ...props }) => (
    <div style={{ fontSize: 18, overflow: 'scroll', ...style }}>
        <CodeMirror
            value={code}
            options={{
                mode: 'jsx',
                theme: 'night-owl',
                lineNumbers: false,
                readOnly: 'nocursor',
                ...options
            }}
            {...props}
        />
    </div>
)

export default CodeBlock
