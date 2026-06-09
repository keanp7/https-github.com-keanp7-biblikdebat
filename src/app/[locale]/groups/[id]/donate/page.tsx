import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { Heart } from 'lucide-react';

export default async function DonatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: group } = await supabase.from('groups').select('*').eq('id', id).single();
  if (!group) notFound();

  // Fetch or create a default fund for the group
  let { data: fund } = await supabase.from('donation_funds').select('*').eq('group_id', id).single();
  
  if (!fund) {
    const { data: newFund } = await supabase.from('donation_funds').insert([{
      group_id: id,
      name: `Support ${group.name}`,
      description: 'Help support our community members in need.',
      goal_amount: 1000.00
    }]).select().single();
    fund = newFund;
  }

  async function handleDonate(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    const amount = parseFloat(formData.get('amount') as string);
    const message = formData.get('message') as string;
    const is_anonymous = formData.get('is_anonymous') === 'on';

    if (fund && amount > 0) {
      await supabase.from('donation_transactions').insert([{
        fund_id: fund.id,
        user_id: session?.user?.id || null,
        amount,
        message,
        is_anonymous
      }]);
      
      // Update raised amount safely
      await supabase.from('donation_funds')
        .update({ raised_amount: fund.raised_amount + amount })
        .eq('id', fund.id);
      
      redirect(`/groups/${id}`);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">{fund.name}</h1>
        <p className="text-gray-600 mt-2">{fund.description}</p>
        <div className="mt-4 bg-gray-100 rounded-full h-4 w-full overflow-hidden">
          <div className="bg-accent h-full" style={{ width: `${Math.min(100, (fund.raised_amount / fund.goal_amount) * 100)}%` }}></div>
        </div>
        <p className="text-sm font-bold mt-2">${fund.raised_amount} raised of ${fund.goal_amount} goal</p>
      </div>

      <form action={handleDonate} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div>
          <label className="block text-sm font-medium text-gray-700">Donation Amount ($)</label>
          <input type="number" step="0.01" min="1" name="amount" required className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:ring-primary focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message (Optional)</label>
          <textarea name="message" rows={3} className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 border shadow-sm focus:ring-primary focus:border-primary"></textarea>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="is_anonymous" id="is_anonymous" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
          <label htmlFor="is_anonymous" className="ml-2 block text-sm text-gray-900">Make this donation anonymously</label>
        </div>
        <button type="submit" className="w-full bg-accent text-white py-3 rounded-md font-bold hover:bg-green-700 transition">
          Donate Now
        </button>
      </form>
    </div>
  );
}
