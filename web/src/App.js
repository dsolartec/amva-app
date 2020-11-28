import React from 'react';
import Loader from './components/Loader';
import Map from './pages/Map';
import Streaming from './pages/Streaming';

export default function App() {
    const [isLoading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState('map');

    return (
        <>
            <Loader isActive={isLoading} />
            <Map
                inStreaming={currentPage === 'streaming'}
                setLoading={setLoading}
                onCapsuleClick={() => setCurrentPage('streaming')}
            />
            {currentPage === 'streaming' && (
                <Streaming
                    onBackClick={() => setCurrentPage('map')}
                />
            )}
        </>
    );
}
