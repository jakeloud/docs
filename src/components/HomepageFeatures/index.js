import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use 🧑‍🚀',
    description: (
      <>
        Jakeloud was designed from the ground up to be easily installed and
        used to get your websites up and running quickly.
      </>
    ),
  },
  {
    title: 'Customize to your needs 🎨',
    description: (
      <>
        Designed with simplicity and flexibility in mind,
        developers can fully rewrite the app to make it a perfect fit for their use case.

      </>
    ),
  },
  {
    title: 'Powered by Nginx 🚀',
    description: (
      <>
        Enjoy fast and reliable performance with low latency, thanks to the optimized infrastructure.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
