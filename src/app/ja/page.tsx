"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen py-12 lg:py-20 bg-white">
      <div className="max-w-11/12 md:max-w-9/12 mx-auto px-6 lg:px-8">
        {/* Artist image and bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Artist Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-4/5 bg-black overflow-hidden border border-black">
              <div className="w-full h-full bg-black flex items-center justify-center">
                <p className="text-white text-lg">Portrét umělkyně</p>
              </div>
            </div>
          </motion.div>

          {/* Minimal bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-8 lg:pt-8"
          >
            <div className="space-y-6 font-inter text-lg leading-relaxed text-black font-light">
              <p>
                Zkoumám průnik mezi digitálním a analogovým světem a vytvářím
                díla, která zpochybňují hranice současného umění.
              </p>
              <p>
                Žiji v Praze a moje tvorba zahrnuje různá média - od tradičního
                malířství až po digitální manipulaci. Vždy hledám nové způsoby,
                jak vyjádřit složitost moderní existence.
              </p>
            </div>

            {/* Simple facts */}
            <div className="pt-8 space-y-2 font-inter text-sm text-gray-700 font-light">
              <p>Narozena 1995, Praha</p>
              <p>MgA. Výtvarné umění, 2020</p>
              <p>Vybrané výstavy napříč Evropou</p>
            </div>
          </motion.div>
        </div>

        {/* Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        ></motion.section>
      </div>
    </div>
  );
}
