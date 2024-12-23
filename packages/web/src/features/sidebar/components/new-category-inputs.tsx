import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function NewCategoryInputs() {
  return (
    <div className="grid gap-4 py-4">
      <div>
        <Label htmlFor="title" className="sr-only">
          Title
        </Label>
        <Input id="title" className="py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low" placeholder="Title" />
      </div>
      <div>
        <Label htmlFor="icon" className="sr-only">
          Icon URL
        </Label>
        <Input
          id="icon"
          className="py-5 shadow-none placeholder:text-white-low focus-visible:ring-dark-low"
          placeholder="https://link-to-your-icon"
        />
      </div>
    </div>
  );
}
