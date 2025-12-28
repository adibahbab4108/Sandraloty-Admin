import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';

type Props = {
  userId: string;
  status: 'ACTIVE' | 'INACTIVE';
};

export default function UserStatusCell({userId, status}: Props) {

  const nextStatus = status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

  const handleToggle = async () => {
    try {
      // await updateStatus({
      //   userId,
      //   status: nextStatus,
      // }).unwrap();
    } catch (error) {
      console.error('Failed to update user status', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Badge
        className={
          status === 'ACTIVE'
            ? 'bg-green-600 text-white'
            : 'bg-red-600 text-white'
        }>
        {status} 
      </Badge>

      <Button
        size="sm"
        variant="outline"
        // disabled={isLoading}
        onClick={handleToggle}>
        {status === 'ACTIVE' ? 'Make Inactive' : 'Make Active'}
      </Button>
    </div>
  );
}
