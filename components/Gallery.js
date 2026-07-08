'use client';

import { useState } from 'react';
import Image from 'next/image';
import ArtworkModal from '@/components/ArtworkModal';

// The gallery's editorial layout is 7 hand-tuned placements (varying column
// spans/offsets, see .item-1..item-7 in globals.css). Cycling through them by
// position keeps every new work laid out consistently with no manual setup.
const LAYOUT_PATTERN_LENGTH = 7;

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
                    {works.map((work, index) => (
                        <div
                            key={work.id}
                            className={`gallery-item item-${(index % LAYOUT_PATTERN_LENGTH) + 1}`}
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
