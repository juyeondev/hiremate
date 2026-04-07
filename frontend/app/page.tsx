'use client';

import { CircleQuestionMark } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);

  return (
    <main>
      <h1>HireMate</h1>
      <p>Welcome to HireMate, your job-hunting assistant!</p>
      <Link href="/lobby">Start</Link>
      <button onClick={() => setModalOpen(true)}>
        <CircleQuestionMark />
      </button>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p>
              HireMate is an AI-powered job-hunting assistant designed to help you find your dream
              job. It provides personalized job recommendations, resume optimization, and interview
              preparation tips based on your skills and preferences. Start your job search with
              HireMate today!
            </p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}
