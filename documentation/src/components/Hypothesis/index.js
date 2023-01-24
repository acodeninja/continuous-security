import React from 'react';
import styles from './styles.module.css';

export const QueryTypeMap = {
    SCALED: "Scale of 1-5",
    MULTIPLE_CHOICE_WITH_CUSTOM: "Multiple choice, with option to add values"
}

export default function Hypothesis({code, title, falsify, note, queries}) {
    return (
        <>
            <section className={styles.hypothesis} id={`hypothesis-${code}`}>
                <a href={`#hypothesis-${code}`}>
                    <strong style={{
                        float: 'left',
                        fontSize: 'x-large',
                        marginLeft: 5,
                        marginRight: 10
                    }}>
                        {code}
                    </strong>
                </a>
                <p><strong style={{
                    fontSize: 'large',
                }}>{title}</strong></p>
                <hr />
                {!!falsify && <p>
                    <strong>Falsify</strong><br/>
                    {falsify}
                </p>}

                {!!note && <p>
                    <strong>⚠️ Note</strong><br/>
                    {note}
                </p>}

                <strong>Queries</strong>

                <ol>
                    {queries.map(query => (
                        <li>
                            {query.question}<br/>
                            <strong>{query.type}</strong>
                        </li>
                    ))}
                </ol>
            </section>
        </>
    );
}
