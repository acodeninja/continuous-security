import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
    {
        title: 'Identify',
        Svg: require('@site/static/img/scan-min.svg').default,
        description: (
            <>
                Scan for and identify vulnerabilities in your web applications.
            </>
        ),
    },
    {
        title: 'Understand',
        Svg: require('@site/static/img/understand-min.svg').default,
        description: (
            <>
                Process and analyse vulnerabilities.
            </>
        ),
    },
    {
        title: 'Action',
        Svg: require('@site/static/img/action-min.svg').default,
        description: (
            <>
                Take action with clearly defined tasks and an executive summary.
            </>
        ),
    },
];

function Feature({Svg, title, description}) {
    return (
        <div className={clsx('col col--4')}>
            {Svg &&
                <div className="text--center">
                    <Svg className={styles.featureSvg} role="img"/>
                </div>
            }
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
