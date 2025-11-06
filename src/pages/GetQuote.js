import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/getquote/ProgressBar';
import OptionCard from '../components/getquote/OptionCard';
import StepNav from '../components/getquote/StepNav';
import LoadingProgress from '../components/getquote/LoadingProgress';
import OTPModal from '../components/getquote/OTPModal';

const steps = [
  { id: 'category', percent: 13, title: 'Move Category' },
  { id: 'locations', percent: 25, title: 'Locations' },
  { id: 'move-type', percent: 38, title: 'Move Type' },
  { id: 'assistance', percent: 50, title: 'Assistance Needed' },
  { id: 'property', percent: 63, title: 'Property Size' },
  { id: 'project-details', percent: 75, title: 'Project Details' },
  { id: 'contact', percent: 88, title: 'Contact Information' },
  { id: 'review', percent: 100, title: 'Review & Submit' },
];

const GetQuote = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [demoOtp, setDemoOtp] = useState('');
  const [form, setForm] = useState({
    // locations
    fromZip: '', fromCity: '', fromState: '', fromAddress: '', fromDate: '', fromTime: '',
    toZip: '', toCity: '', toState: '', toAddress: '', toDate: '', toTime: '',
    // selections
    moveCategory: '', moveType: '', assistance: '', property: '',
    // conditional details
    pianoType: '', pianoStairs: '',
    truckSize: '',
    vehicleType: '', vehicleMake: '', vehicleModel: '', vehicleYear: '',
    // project
    projectDesc: '',
    // contact
    firstName: '', lastName: '', phone: '', email: '',
  });

  const current = steps[stepIndex];
  const canBack = stepIndex > 0 && !loadingPhase;

  const derivedPropertyTitle = (() => {
    if (current.id !== 'property') return current.title;
    if (form.assistance === 'Move a Piano') return 'Piano Details';
    if (form.assistance === 'Truck or Container Rental') return 'Truck/Container Size';
    if (form.assistance === 'Vehicle Move') return 'Vehicle Details';
    return 'Property Size';
  })();

  const next = () => {
    if (loadingPhase) return;
    // special 75% behavior -> show loading to 100%, then jump to 88%
    if (current.id === 'project-details') {
      setLoadingPhase(true);
      return;
    }
    if (current.id === 'review') {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setDemoOtp(code);
      setShowOTP(true);
      return;
    }
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const back = () => {
    if (!canBack) return;
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const disableNext = useMemo(() => {
    switch (current.id) {
      case 'category':
        return !form.moveCategory;
      case 'locations':
        return !form.fromZip || !form.fromCity || !form.fromState || !form.fromAddress || !form.fromDate || !form.toZip || !form.toCity || !form.toState || !form.toAddress;
      case 'move-type':
        return !form.moveType;
      case 'assistance':
        return !form.assistance;
      case 'property': {
        if (form.assistance === 'Move a Piano') {
          return !form.pianoType || !form.pianoStairs;
        }
        if (form.assistance === 'Truck or Container Rental') {
          return !form.truckSize;
        }
        if (form.assistance === 'Vehicle Move') {
          return !form.vehicleType || !form.vehicleMake || !form.vehicleModel || !form.vehicleYear;
        }
        return !form.property;
      }
      case 'project-details':
        return !form.projectDesc;
      case 'contact':
        return !form.firstName || !form.phone || !form.email;
      default:
        return false;
    }
  }, [current.id, form]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-yellow-50/40 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-yellow-200 shadow-[0_6px_24px_rgba(0,0,0,0.08)] p-5 md:p-7">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-orange-500 text-white rounded-xl w-11 h-11 flex items-center justify-center shadow">🚚</div>
          </div>
          <div className="text-center text-lg font-semibold text-gray-800">Get Your Free Moving Quote</div>
          {!loadingPhase && (
            <div className="mt-2">
              <ProgressBar percent={current.percent} label={`${current.percent}% Complete • ${derivedPropertyTitle}`} />
            </div>
          )}

          {/* Loading interstitial after 75% */}
          {loadingPhase && (
            <LoadingProgress
              onDone={() => {
                setLoadingPhase(false);
                // jump to contact (88%) after loading finishes
                setStepIndex(steps.findIndex((s) => s.id === 'contact'));
              }}
            />
          )}

          {!loadingPhase && (
            <div className="mt-6">
              {current.id === 'category' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">What type of move is this?</div>
                  <div className="text-sm text-gray-500 mb-4">Select the category that best describes your move</div>
                  <div className="space-y-3">
                    <OptionCard icon="🏠" title="Residential Move" selected={form.moveCategory==='Residential'} onClick={() => set('moveCategory')('Residential')} />
                    <OptionCard icon="🏢" title="Commercial Move" selected={form.moveCategory==='Commercial'} onClick={() => set('moveCategory')('Commercial')} />
                    <OptionCard icon="📦" title="Specialty Items" selected={form.moveCategory==='Specialty'} onClick={() => set('moveCategory')('Specialty')} />
                  </div>
                </div>
              )}

              {current.id === 'locations' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">Where are you moving from and to?</div>
                  <div className="text-sm text-gray-500 mb-4">Enter both origin and destination details</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-medium text-gray-700 mb-3">🏁 Moving From</div>
                      <div className="grid grid-cols-1 gap-3">
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="ZIP Code" value={form.fromZip} onChange={set('fromZip')} />
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="City" value={form.fromCity} onChange={set('fromCity')} />
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="State" value={form.fromState} onChange={set('fromState')} />
                          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="Street Address" value={form.fromAddress} onChange={set('fromAddress')} />
                        <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" value={form.fromDate} onChange={set('fromDate')} />
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="font-medium text-gray-700 mb-3">📍 Moving To</div>
                      <div className="grid grid-cols-1 gap-3">
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="ZIP Code" value={form.toZip} onChange={set('toZip')} />
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="City" value={form.toCity} onChange={set('toCity')} />
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="State" value={form.toState} onChange={set('toState')} />
                        <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="Street Address" value={form.toAddress} onChange={set('toAddress')} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {current.id === 'move-type' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">What type of move is this?</div>
                  <div className="text-sm text-gray-500 mb-4">Choose the service that fits your needs</div>
                  <div className="space-y-3">
                    <OptionCard icon="🚚" title="Local Move" subtitle="Within the same city" selected={form.moveType==='Local'} onClick={() => set('moveType')('Local')} />
                    <OptionCard icon="🛣️" title="In State Move" subtitle="Within the same state" selected={form.moveType==='In State'} onClick={() => set('moveType')('In State')} />
                    <OptionCard icon="🗺️" title="Out of State Move" subtitle="Moving to another state" selected={form.moveType==='Out of State'} onClick={() => set('moveType')('Out of State')} />
                  </div>
                </div>
              )}

              {current.id === 'assistance' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">What kind of assistance do you need?</div>
                  <div className="text-sm text-gray-500 mb-4">Select the type of help you require</div>
                  <div className="space-y-3">
                    <OptionCard icon="📦" title="Packaging and Boxing" selected={form.assistance==='Packaging and Boxing'} onClick={() => set('assistance')('Packaging and Boxing')} />
                    <OptionCard icon="🚛" title="Just Moving" selected={form.assistance==='Just Moving'} onClick={() => set('assistance')('Just Moving')} />
                    <OptionCard icon="🧳" title="Just Packing" selected={form.assistance==='Just Packing'} onClick={() => set('assistance')('Just Packing')} />
                    <OptionCard icon="🎹" title="Move a Piano" selected={form.assistance==='Move a Piano'} onClick={() => set('assistance')('Move a Piano')} />
                    <OptionCard icon="🚚" title="Truck or Container Rental" selected={form.assistance==='Truck or Container Rental'} onClick={() => set('assistance')('Truck or Container Rental')} />
                    <OptionCard icon="🚗" title="Vehicle Move" selected={form.assistance==='Vehicle Move'} onClick={() => set('assistance')('Vehicle Move')} />
                  </div>
                </div>
              )}

              {current.id === 'property' && (
                <div>
                  {form.assistance === 'Move a Piano' && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">What type of piano are you moving?</div>
                      <div className="text-sm text-gray-500 mb-4">Select your piano type and stairs/floors</div>
                      <div className="space-y-3 mb-4">
                        <OptionCard title="Upright Piano" subtitle="Standard upright piano" selected={form.pianoType==='Upright Piano'} onClick={() => set('pianoType')('Upright Piano')} />
                        <OptionCard title="Baby Grand" subtitle="Small grand piano" selected={form.pianoType==='Baby Grand'} onClick={() => set('pianoType')('Baby Grand')} />
                        <OptionCard title="Grand Piano" subtitle="Full-size grand piano" selected={form.pianoType==='Grand Piano'} onClick={() => set('pianoType')('Grand Piano')} />
                        <OptionCard title="Digital Piano" subtitle="Electronic keyboard/piano" selected={form.pianoType==='Digital Piano'} onClick={() => set('pianoType')('Digital Piano')} />
                      </div>
                      <label className="block text-sm text-gray-700 mb-1">Number of floors/stairs involved</label>
                      <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="e.g., 2" value={form.pianoStairs} onChange={set('pianoStairs')} />
                    </div>
                  )}

                  {form.assistance === 'Truck or Container Rental' && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">What size truck or container do you need?</div>
                      <div className="text-sm text-gray-500 mb-4">Select the size that fits your move</div>
                      <div className="space-y-3">
                        <OptionCard title="10 ft Truck" subtitle="Small moves, 1-2 rooms" selected={form.truckSize==='10 ft Truck'} onClick={() => set('truckSize')('10 ft Truck')} />
                        <OptionCard title="15 ft Truck" subtitle="Studio to 1 bedroom" selected={form.truckSize==='15 ft Truck'} onClick={() => set('truckSize')('15 ft Truck')} />
                        <OptionCard title="20 ft Truck" subtitle="2-3 bedrooms" selected={form.truckSize==='20 ft Truck'} onClick={() => set('truckSize')('20 ft Truck')} />
                        <OptionCard title="26 ft Truck" subtitle="3-4 bedrooms" selected={form.truckSize==='26 ft Truck'} onClick={() => set('truckSize')('26 ft Truck')} />
                        <OptionCard title="Small Container" subtitle="7-8 ft container" selected={form.truckSize==='Small Container'} onClick={() => set('truckSize')('Small Container')} />
                        <OptionCard title="Large Container" subtitle="16-20 ft container" selected={form.truckSize==='Large Container'} onClick={() => set('truckSize')('Large Container')} />
                      </div>
                    </div>
                  )}

                  {form.assistance === 'Vehicle Move' && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">What type of vehicle are you moving?</div>
                      <div className="text-sm text-gray-500 mb-4">Select your vehicle type and provide details</div>
                      <div className="space-y-3 mb-4">
                        <OptionCard title="Car" subtitle="Sedan, coupe, or hatchback" selected={form.vehicleType==='Car'} onClick={() => set('vehicleType')('Car')} />
                        <OptionCard title="SUV/Truck" subtitle="SUV, pickup truck, or van" selected={form.vehicleType==='SUV/Truck'} onClick={() => set('vehicleType')('SUV/Truck')} />
                        <OptionCard title="Motorcycle" subtitle="Motorcycle or scooter" selected={form.vehicleType==='Motorcycle'} onClick={() => set('vehicleType')('Motorcycle')} />
                        <OptionCard title="Boat/RV" subtitle="Boat, RV, or trailer" selected={form.vehicleType==='Boat/RV'} onClick={() => set('vehicleType')('Boat/RV')} />
                        <OptionCard title="Classic/Luxury" subtitle="Classic or luxury vehicle" selected={form.vehicleType==='Classic/Luxury'} onClick={() => set('vehicleType')('Classic/Luxury')} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Make</label>
                          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="Toyota" value={form.vehicleMake} onChange={set('vehicleMake')} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Model</label>
                          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="Camry" value={form.vehicleModel} onChange={set('vehicleModel')} />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Year</label>
                          <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="2020" value={form.vehicleYear} onChange={set('vehicleYear')} />
                        </div>
                      </div>
                    </div>
                  )}

                  {(!form.assistance || (form.assistance !== 'Move a Piano' && form.assistance !== 'Truck or Container Rental' && form.assistance !== 'Vehicle Move')) && (
                    <div>
                      <div className="font-semibold text-gray-800 mb-2">How large is your property?</div>
                      <div className="text-sm text-gray-500 mb-4">Select the size that best describes your space</div>
                      <div className="space-y-3">
                        <OptionCard title="Studio" subtitle="Small apartment" selected={form.property==='Studio'} onClick={() => set('property')('Studio')} />
                        <OptionCard title="1 Bedroom" subtitle="One bedroom apartment/house" selected={form.property==='1 Bedroom'} onClick={() => set('property')('1 Bedroom')} />
                        <OptionCard title="2-3 Bedrooms" subtitle="Medium-sized home" selected={form.property==='2-3 Bedrooms'} onClick={() => set('property')('2-3 Bedrooms')} />
                        <OptionCard title="4+ Bedrooms" subtitle="Large home" selected={form.property==='4+ Bedrooms'} onClick={() => set('property')('4+ Bedrooms')} />
                        <OptionCard title="Mansion" subtitle="Estate or very large property" selected={form.property==='Mansion'} onClick={() => set('property')('Mansion')} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {current.id === 'project-details' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">Tell us more about your project</div>
                  <div className="text-sm text-gray-500 mb-4">Provide details that help movers give accurate quotes</div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Project Description</label>
                    <textarea className="w-full rounded-lg border border-gray-300 px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" placeholder="Describe your moving project, special items, access restrictions, timing requirements, preferred moving date…" value={form.projectDesc} onChange={set('projectDesc')} />
                  </div>
                </div>
              )}

              {current.id === 'contact' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">We have matching professional movers in your area</div>
                  <div className="text-sm text-gray-500 mb-4">Fill your info to receive quotes</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">First Name</label>
                      <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" value={form.firstName} onChange={set('firstName')} placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                      <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" value={form.lastName} onChange={set('lastName')} placeholder="Doe" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Phone Number</label>
                      <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" value={form.phone} onChange={set('phone')} placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Email Address</label>
                      <input className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400" type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
                    </div>
                  </div>
                </div>
              )}

              {current.id === 'review' && (
                <div>
                  <div className="font-semibold text-gray-800 mb-2">Review your details</div>
                  <div className="text-sm text-gray-500 mb-6">Submit to get quotes from movers</div>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-[0_6px_24px_rgba(0,0,0,0.06)] overflow-hidden">
                    <div className="bg-gray-50 px-5 py-3 border-b flex items-center justify-between">
                      <div className="font-semibold text-gray-800">Quote Receipt</div>
                      <div className="text-xs text-gray-500">{new Date().toLocaleString()}</div>
                    </div>
                    <div className="p-5 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4">
                          <div className="font-semibold text-gray-700 mb-2">Move Summary</div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><span className="font-medium text-gray-800">Category:</span> {form.moveCategory || '—'}</div>
                            <div><span className="font-medium text-gray-800">Move Type:</span> {form.moveType || '—'}</div>
                            <div><span className="font-medium text-gray-800">Assistance:</span> {form.assistance || '—'}</div>
                            <div><span className="font-medium text-gray-800">Property:</span> {form.property || '—'}</div>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="font-semibold text-gray-700 mb-2">Contact</div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div><span className="font-medium text-gray-800">Name:</span> {[form.firstName, form.lastName].filter(Boolean).join(' ') || '—'}</div>
                            <div><span className="font-medium text-gray-800">Phone:</span> {form.phone || '—'}</div>
                            <div><span className="font-medium text-gray-800">Email:</span> {form.email || '—'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="font-semibold text-gray-700 mb-3">Locations</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            </div>
                            <div className="rounded-lg border p-4">
                              <div className="font-semibold text-gray-700 mb-2">Contact</div>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div><span className="font-medium text-gray-800">Name:</span> {[form.firstName, form.lastName].filter(Boolean).join(' ') || '—'}</div>
                                <div><span className="font-medium text-gray-800">Phone:</span> {form.phone || '—'}</div>
                                <div><span className="font-medium text-gray-800">Email:</span> {form.email || '—'}</div>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border p-4">
                            <div className="font-semibold text-gray-700 mb-3">Locations</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm font-medium text-gray-700 mb-1">🏁 Moving From</div>
                                <div className="text-sm text-gray-600">
                                  <div>{form.fromAddress || '—'}</div>
                                  <div>{[form.fromCity, form.fromState, form.fromZip].filter(Boolean).join(', ') || '—'}</div>
                                  <div className="mt-1 text-xs text-gray-500">📅 {form.fromDate || '—'}</div>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-700 mb-1">📍 Moving To</div>
                                <div className="text-sm text-gray-600">
                                  <div>{form.toAddress || '—'}</div>
                                  <div>{[form.toCity, form.toState, form.toZip].filter(Boolean).join(', ') || '—'}</div>
                                </div>
                              </div>
                            </div>
                              <>
                                <div><span className="font-medium text-gray-800">Piano Type:</span> {form.pianoType || '—'}</div>
                                <div><span className="font-medium text-gray-800">Floors/Stairs:</span> {form.pianoStairs || '—'}</div>
                              </>
                            )}
                            {form.assistance === 'Truck or Container Rental' && (
                              <div><span className="font-medium text-gray-800">Truck/Container Size:</span> {form.truckSize || '—'}</div>
                            )}
                            {form.assistance === 'Vehicle Move' && (
                              <>
                                <div><span className="font-medium text-gray-800">Vehicle Type:</span> {form.vehicleType || '—'}</div>
                                <div><span className="font-medium text-gray-800">Make/Model/Year:</span> {[form.vehicleMake, form.vehicleModel, form.vehicleYear].filter(Boolean).join(' ') || '—'}</div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="rounded-lg border p-4">
                        <div className="font-semibold text-gray-700 mb-2">Project Description</div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap">{form.projectDesc || '—'}</div>
                      </div>

                      <div className="text-xs text-gray-500 text-right">This is a preview. You can go back to edit any section before submitting.</div>
                    </div>
                  </div>
                </div>
              )}

              <StepNav
                onBack={back}
                onNext={next}
                nextLabel={current.id === 'review' ? 'Submit Quote Request' : 'Next'}
                disableNext={disableNext}
              />
            </div>
          )}
          <OTPModal
            isOpen={showOTP}
            phone={form.phone}
            onClose={() => setShowOTP(false)}
            hintCode={demoOtp}
            onVerify={() => {
              setShowOTP(false);
              try {
                const existing = JSON.parse(localStorage.getItem('myRequests') || '[]');
                const req = {
                  id: `#RQ-${Date.now().toString().slice(-6)}`,
                  date: new Date().toISOString().slice(0,10),
                  from: {
                    address: form.fromAddress,
                    city: form.fromCity,
                    zip: form.fromZip,
                  },
                  to: {
                    address: form.toAddress,
                    city: form.toCity,
                    zip: form.toZip,
                  },
                  category: form.moveCategory,
                  moveType: form.moveType,
                  assistance: form.assistance,
                  property: form.property,
                  status: 'Submitted',
                };
                localStorage.setItem('myRequests', JSON.stringify([req, ...existing]));
              } catch (e) {
                console.error('Failed saving request', e);
              }
              navigate('/choose-movers', { state: { form } });
            }}
          />
        </div>
      </div>

      
    </div>
  );
};

export default GetQuote;
