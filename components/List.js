import { Appear } from 'mdx-deck'

const List = ({ array }) => (
    <div style={{ fontSize: 40, textAlign: 'left' }}>
        <ul>
            <Appear>
                {array.map(item => (
                    <li>{item}</li>
                ))}
            </Appear>
        </ul>
    </div>
)

export default List
