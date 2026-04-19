'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/lib/context/auth-context'
import { toast } from 'sonner'
import { Loader2, Eye, EyeOff, GraduationCap, Users, BookOpen, ArrowRight, ArrowLeft } from 'lucide-react'
import { FLUENCY_LEVELS, type FluencyLevel } from '@/lib/types'
import { LevelBadge } from '@/components/level-badge'

type UserRole = 'student' | 'parent' | 'teacher'

const roleInfo = {
  student: {
    icon: GraduationCap,
    title: 'Student',
    description: 'Learn Hindi with interactive lessons and earn world language credit',
  },
  parent: {
    icon: Users,
    title: 'Parent / Guardian',
    description: 'Monitor your child\'s progress and understand the curriculum',
  },
  teacher: {
    icon: BookOpen,
    title: 'Teacher / Administrator',
    description: 'Manage students, track progress, and access teaching resources',
  },
}

function RegisterPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { register } = useAuth()
  
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | ''>('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [gradeLevel, setGradeLevel] = useState('7')
  const [fluencyLevel, setFluencyLevel] = useState<FluencyLevel>('novice-low')
  const [linkedStudentEmail, setLinkedStudentEmail] = useState('')
  const [school, setSchool] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam && ['student', 'parent', 'teacher'].includes(roleParam)) {
      setRole(roleParam as UserRole)
      setStep(2)
    }
  }, [searchParams])

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return

    setIsLoading(true)

    const success = await register({
      email,
      password,
      name,
      role,
      gradeLevel: role === 'student' ? parseInt(gradeLevel) : undefined,
      fluencyLevel: role === 'student' ? fluencyLevel : undefined,
      linkedStudentEmail: role === 'parent' ? linkedStudentEmail : undefined,
      school: role === 'teacher' ? school : undefined,
    })

    if (success) {
      toast.success('Account created successfully!')
      router.push('/dashboard')
    } else {
      toast.error('Email already exists')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold text-xl">भा</span>
          </div>
          <span className="font-semibold text-2xl text-foreground">Sankalp</span>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {step === 1 ? 'Create Your Account' : `Register as ${roleInfo[role as UserRole]?.title || ''}`}
            </CardTitle>
            <CardDescription>
              {step === 1 
                ? 'Choose your role to get started'
                : 'Fill in your details to create your account'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-3">
                {(Object.keys(roleInfo) as UserRole[]).map((roleKey) => {
                  const info = roleInfo[roleKey]
                  return (
                    <button
                      key={roleKey}
                      onClick={() => handleRoleSelect(roleKey)}
                      className="w-full p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-start gap-4 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground ml-auto self-center" />
                    </button>
                  )
                })}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {role === 'student' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select value={gradeLevel} onValueChange={setGradeLevel}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6th Grade</SelectItem>
                          <SelectItem value="7">7th Grade</SelectItem>
                          <SelectItem value="8">8th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Current Hindi Proficiency</Label>
                      <p className="text-sm text-muted-foreground">
                        Select the level that best describes your current ability
                      </p>
                      <RadioGroup
                        value={fluencyLevel}
                        onValueChange={(value) => setFluencyLevel(value as FluencyLevel)}
                        className="space-y-2"
                      >
                        {(Object.keys(FLUENCY_LEVELS) as FluencyLevel[]).map((level) => {
                          const info = FLUENCY_LEVELS[level]
                          return (
                            <label
                              key={level}
                              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                            >
                              <RadioGroupItem value={level} className="mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <LevelBadge level={level} size="sm" />
                                </div>
                                <p className="text-sm text-muted-foreground">{info.description}</p>
                              </div>
                            </label>
                          )
                        })}
                      </RadioGroup>
                    </div>
                  </>
                )}

                {role === 'parent' && (
                  <div className="space-y-2">
                    <Label htmlFor="studentEmail">Student&apos;s Email (optional)</Label>
                    <Input
                      id="studentEmail"
                      type="email"
                      placeholder="your.child@example.com"
                      value={linkedStudentEmail}
                      onChange={(e) => setLinkedStudentEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Link to an existing student account to view their progress
                    </p>
                  </div>
                )}

                {role === 'teacher' && (
                  <div className="space-y-2">
                    <Label htmlFor="school">School Name</Label>
                    <Input
                      id="school"
                      placeholder="Enter your school name"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <RegisterPageContent />
    </Suspense>
  )
}
