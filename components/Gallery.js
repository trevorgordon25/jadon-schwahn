'use client';

import { useState } from 'react';
import Image from 'next/image';
import ArtworkModal from '@/components/ArtworkModal';

export default function Gallery({ works }) {
    const [selectedWork, setSelectedWork] = useState(null);

    return (
        <>
            <section className="gallery-section" id="work">
                <div className="section-header">
                    <span className="section-label">Selected Works</span>
                    <h2 className="section-title">Recent Paintings &amp; Drawings</h2>
                </div>
                <div className="gallery-grid">
                    {works.map((work) => (
                        <div
                            key={work.id}
                            className={`gallery-item ${work.gridClass}`}
                            onClick={() => setSelectedWork(work)}
                        >
                            <div className="artwork-frame">
                                {work.image?.url ? (
                                    <Image
                                        src={work.image.url}
                                        alt={work.image.alt || work.title}
                                        width={work.image.width || 1200}
                                        height={work.image.height || 1200}
                                        sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 40vw"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                ) : (
                                    <svg
                                        viewBox={work.svgViewBox}
                                        xmlns="http://www.w3.org/2000/svg"
                                        dangerouslySetInnerHTML={{ __html: work.svgContent }}
                                    />
                                )}
                                <div className="artwork-hint"><span>View Details</span></div>
                            </div>
                            <div className="artwork-meta">
                                <div>
                                    <p className="artwork-title">{work.title}</p>
                                    <p className="artwork-medium">{work.medium}</p>
                                </div>
                                <span className="artwork-year">{work.year}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <ArtworkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
        </>
    );
}
