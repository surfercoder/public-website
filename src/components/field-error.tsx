import { ActionState } from '@/lib/utils';

type FieldErrorProps = {
  actionState: ActionState | null;
  name: string;
};

export default function FieldError({ actionState, name }: FieldErrorProps) {
  if (!actionState?.fieldErrors?.[name]) return null;

  return (
    <p className="text-red-500 text-xs" data-testid="field-error">
      {actionState.fieldErrors[name]?.[0]}
    </p>
  );
}