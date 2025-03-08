import { createReactiveMap, createStaticRecord, createStore } from '@noodlestan/designer-signals';
import { For, type JSX, batch } from 'solid-js';

import styles from './App.module.css';
import { ShowDecision } from './components';

const inputs = [
    {
        name: 'Font 1',
        model: 'typeface-value/explicit',
        params: {
            value: {
                fontName: '',
            },
        },
    },
    {
        name: 'Font 2',
        model: 'typeface-value/explicit',
        params: {
            value: {
                fontName: 'Georgia',
            },
        },
    },
    {
        name: 'Font 3',
        model: 'typeface-value/explicit',
        params: {
            value: {
                $name: 'Font 1',
            },
        },
    },
];

const newRecord = {
    name: 'Font 4',
    model: 'typeface-value/explicit',
    params: {
        value: {
            $name: 'Font 3',
        },
    },
};

const loadedRecords = inputs.map(input => createStaticRecord(input));
const map = createReactiveMap(loadedRecords);
const store = createStore(map);

function App(): JSX.Element {
    const allRecords = () => store.records();
    const records = () => allRecords().slice(0, 10);
    const decisions = () => records().map(rec => store.decision({ $name: rec.input.name }));

    const d0 = () => store.decision({ $name: 'Font 1' });

    const handleClick1 = () => {
        const currentTime = performance.now();
        batch(() => {
            for (let ix = 0; ix < 1000; ix++) {
                map.insertRecord(newRecord);
            }
        });
        console.info(performance.now() - currentTime);
    };

    const handleClick2 = () => {
        const modifiedRecord = {
            name: 'Font 1',
            model: 'typeface-value/explicit',
            params: {
                value: {
                    fontName: 'Foo' + crypto.randomUUID(),
                },
            },
        };
        const uuid = records()[0].uuid;
        const currentTime = performance.now();
        map.updateRecord(uuid, modifiedRecord);
        console.info(performance.now() - currentTime);
    };

    return (
        <div class={styles.App}>
            <button onClick={handleClick1}>add</button>
            <button onClick={handleClick2}>edit</button>
            <h2>Records ({allRecords().length})</h2>
            <ul>
                <For each={records()}>{record => <li>{record.input.name}</li>}</For>
            </ul>
            <h2>Decisions ({decisions().length})</h2>
            <ul>
                <For each={decisions()}>
                    {decision => (
                        <li>
                            <ShowDecision store={store} d={decision} />
                        </li>
                    )}
                </For>
            </ul>
            <h2>Decision Not Found</h2>
            <ShowDecision store={store} d={d0()} />
            {/* <div>{typeof notFoundValue()}</div> */}
        </div>
    );
}

export default App;
