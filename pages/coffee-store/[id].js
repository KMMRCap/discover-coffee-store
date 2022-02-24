import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import coffeeStoresData from '../../data/coffeeStores.json'
import styles from '../../styles/coffee-store.module.css'
import cls from 'classnames'

export async function getStaticProps(staticProps) {
    const params = staticProps.params
    return {
        props: {
            coffeeStores: coffeeStoresData.results.find(item => item.fsq_id === params.id)
        }
    }
}

export async function getStaticPaths() {

    const paths = coffeeStoresData.results.map(item => {
        return {
            params: {
                id: item.fsq_id.toString()
            }
        }
    })

    return {
        paths,
        fallback: false
    }
}

const CoffeeStore = (props) => {

    const [voting, setVoting] = useState(0)

    const router = useRouter()

    if (router.isFallback) {
        return <div>loading ...</div>
    }

    const { fsq_id, name, location, imgUrl } = props.coffeeStores
    const { address, neighborhood } = location

    const handleUpVoteClick = () => {
        setVoting(voting + 1)
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href='/'>
                            <a>back to home</a>
                        </Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <div className={styles.storeImgWrapper}>
                        <Image
                            alt={name}
                            // src={imgUrl}
                            src={'/static/mesh-gradient.png'}
                            width={600}
                            height={360}
                            className={styles.storeImg}
                        />
                    </div>
                </div>
                <div className={cls(styles.col2, 'glass')}>
                    {address ?
                        <div className={styles.iconWrapper}>
                            <Image alt={name} src='/static/icons/places.svg' width={24} height={24} />
                            <p className={styles.text}>{address}</p>
                        </div>
                        :
                        null
                    }
                    {neighborhood ?
                        <div className={styles.iconWrapper}>
                            <Image alt={name} src='/static/icons/nearMe.svg' width={24} height={24} />
                            <p className={styles.text}>{neighborhood}</p>
                        </div>
                        :
                        null
                    }
                    <div className={styles.iconWrapper}>
                        <Image alt={name} src='/static/icons/star.svg' width={24} height={24} />
                        <p className={styles.text}>{voting}</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpVoteClick}
                    >
                        Up Vote !
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CoffeeStore;