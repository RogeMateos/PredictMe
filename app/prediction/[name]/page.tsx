"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PredictionPage() {
  const params = useParams();
  const name = params.name as string;
  
  const [age, setAge] = useState<any>(null);
  const [gender, setGender] = useState<any>(null);
  const [country, setCountry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch all data in parallel
        const [ageRes, genderRes, countryRes] = await Promise.all([
          fetch(`https://api.agify.io/?name=${name}`),
          fetch(`https://api.genderize.io/?name=${name}`),
          fetch(`https://api.nationalize.io/?name=${name}`)
        ]);
        
        // Parse JSON responses
        const ageData = await ageRes.json();
        const genderData = await genderRes.json();
        const countryData = await countryRes.json();
        
        // Update state with fetched data
        setAge(ageData);
        setGender(genderData);
        setCountry(countryData);
      } catch (error) {
        console.error("Error fetching prediction data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (name) {
      fetchData();
    }
  }, [name]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm flex flex-col">
        <h1 className="text-4xl mb-4 text-center">Prediction Results</h1>
        
        <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Personal Info for: {name}</h2>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <span className="font-bold">Age:</span> {age?.age}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <span className="font-bold">Gender:</span> {gender?.gender}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-700 text-lg">
              <span className="font-bold">Country:</span> {country?.country?.[0]?.country_id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}