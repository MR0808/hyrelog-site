import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // TODO: Add authentication/authorization check here
        // For now, this is unprotected - you should add auth before deploying
        
        if (!supabase) {
            return NextResponse.json(
                { error: 'Supabase is not configured' },
                { status: 500 }
            );
        }

        const { data, error } = await supabase
            .from('early_access_signups')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch signups' },
                { status: 500 }
            );
        }

        return NextResponse.json(data || []);
    } catch (error) {
        console.error('Error fetching signups:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

