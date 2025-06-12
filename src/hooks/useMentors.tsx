
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Mentor {
  id: string;
  first_name: string;
  last_name: string;
  role: 'mentor' | 'mentee';
  department: string;
  bio: string;
  skills: string[];
  availability: string;
}

export const useMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'mentor');

        if (error) {
          console.error('Error fetching mentors:', error);
        } else {
          setMentors(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return { mentors, loading };
};
