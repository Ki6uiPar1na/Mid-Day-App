import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (memberId: string, password: string) => void;
};

const LoginModal = ({ isOpen, onClose, onLogin }: Props) => {
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(memberId, password);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 backdrop-blur-0"
          enterTo="opacity-100 backdrop-blur-md"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 backdrop-blur-md"
          leaveTo="opacity-0 backdrop-blur-0"
        >
          <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="relative w-full max-w-md rounded-2xl bg-white/40 border border-white/40 backdrop-blur-xl shadow-elegant p-8 text-white drop-shadow-lg">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 rounded-full p-1 hover:bg-white/30 transition"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              <Dialog.Title className="text-3xl font-extrabold text-center mb-6 select-none drop-shadow-md">
                Member Login
              </Dialog.Title>

              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder="Member ID"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  required
                  autoFocus
                  className="w-full rounded-md bg-white/90 px-4 py-3 placeholder-white/80 text-gray-900 font-semibold outline-none focus:ring-4 focus:ring-primary transition shadow-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md bg-white/90 px-4 py-3 placeholder-white/80 text-gray-900 font-semibold outline-none focus:ring-4 focus:ring-primary transition shadow-md"
                />

                <Button type="submit" className="w-full py-3 text-lg font-bold shadow-lg">
                  Login
                </Button>
              </form>

              <p className="mt-8 text-center text-base text-white/90 select-none drop-shadow">
                No account?{' '}
                <a
                  href="mailto:admin@example.com"
                  className="text-primary underline hover:text-primary-glow transition font-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Admin
                </a>
              </p>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginModal;
