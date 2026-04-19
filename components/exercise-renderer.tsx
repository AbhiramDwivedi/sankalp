'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.shadcn'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Lightbulb, Volume2, Mic, MicOff } from 'lucide-react'
import type { Exercise } from '@/lib/types'

interface ExerciseRendererProps {
  exercise: Exercise
  onAnswer: (correct: boolean, answer: string) => void
  showFeedback?: boolean
}

export function ExerciseRenderer({ exercise, onAnswer, showFeedback = true }: ExerciseRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [textAnswer, setTextAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const handleSubmit = () => {
    const answer = exercise.type === 'fill-in-blank' || exercise.type === 'writing' || exercise.type === 'translation'
      ? textAnswer.trim().toLowerCase()
      : selectedAnswer

    let correct = false
    if (Array.isArray(exercise.correctAnswer)) {
      correct = exercise.correctAnswer.some(a => a.toLowerCase() === answer.toLowerCase())
    } else {
      correct = exercise.correctAnswer.toLowerCase() === answer.toLowerCase()
    }

    setIsCorrect(correct)
    setIsSubmitted(true)
    onAnswer(correct, answer)
  }

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window && exercise.question) {
      // Extract Hindi text if present
      const hindiMatch = exercise.question.match(/[ऀ-ॿ]+/g)
      if (hindiMatch) {
        const utterance = new SpeechSynthesisUtterance(hindiMatch.join(' '))
        utterance.lang = 'hi-IN'
        speechSynthesis.speak(utterance)
      }
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would handle actual audio recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setSelectedAnswer('recorded')
      }, 3000)
    }
  }

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'multiple-choice':
      case 'listening-comprehension':
        return (
          <RadioGroup
            value={selectedAnswer}
            onValueChange={setSelectedAnswer}
            disabled={isSubmitted}
            className="space-y-3"
          >
            {exercise.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  className={cn(
                    isSubmitted && option === exercise.correctAnswer && 'border-primary text-primary',
                    isSubmitted && selectedAnswer === option && !isCorrect && 'border-destructive text-destructive'
                  )}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={cn(
                    'flex-1 p-3 rounded-lg border cursor-pointer transition-colors',
                    !isSubmitted && 'hover:bg-muted/50',
                    selectedAnswer === option && !isSubmitted && 'border-primary bg-primary/5',
                    isSubmitted && option === exercise.correctAnswer && 'border-primary bg-primary/10',
                    isSubmitted && selectedAnswer === option && !isCorrect && 'border-destructive bg-destructive/10'
                  )}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case 'fill-in-blank':
      case 'translation':
        return (
          <div className="space-y-4">
            <Input
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Type your answer..."
              disabled={isSubmitted}
              className={cn(
                'text-lg',
                isSubmitted && isCorrect && 'border-primary',
                isSubmitted && !isCorrect && 'border-destructive'
              )}
            />
            {isSubmitted && !isCorrect && (
              <p className="text-sm text-muted-foreground">
                Correct answer: <span className="font-medium text-foreground">{exercise.correctAnswer}</span>
              </p>
            )}
          </div>
        )

      case 'speaking':
        return (
          <div className="flex flex-col items-center gap-4">
            <Button
              size="lg"
              variant={isRecording ? 'destructive' : 'outline'}
              onClick={toggleRecording}
              disabled={isSubmitted}
              className="w-32 h-32 rounded-full"
            >
              {isRecording ? (
                <MicOff className="h-12 w-12" />
              ) : (
                <Mic className="h-12 w-12" />
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              {isRecording ? 'Recording... Click to stop' : 'Click to start recording'}
            </p>
            {selectedAnswer === 'recorded' && (
              <p className="text-sm text-primary font-medium">Recording complete!</p>
            )}
          </div>
        )

      case 'writing':
        return (
          <div className="space-y-4">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Write your response in Hindi..."
              disabled={isSubmitted}
              rows={4}
              className={cn(
                'w-full p-3 border rounded-lg bg-background text-lg resize-none',
                'focus:outline-none focus:ring-2 focus:ring-ring',
                isSubmitted && isCorrect && 'border-primary',
                isSubmitted && !isCorrect && 'border-destructive'
              )}
            />
          </div>
        )

      default:
        return (
          <p className="text-muted-foreground">Exercise type not supported: {exercise.type}</p>
        )
    }
  }

  return (
    <Card className={cn(
      isSubmitted && isCorrect && 'border-primary/50',
      isSubmitted && !isCorrect && 'border-destructive/50'
    )}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {exercise.instructions && (
              <p className="text-sm text-muted-foreground mb-2">{exercise.instructions}</p>
            )}
            <CardTitle className="text-lg font-medium">{exercise.question}</CardTitle>
          </div>
          {(exercise.type === 'listening-comprehension' || exercise.audioUrl) && (
            <Button variant="outline" size="icon" onClick={handlePlayAudio}>
              <Volume2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderExerciseContent()}

        {/* Hint */}
        {exercise.hint && !isSubmitted && (
          <div>
            {showHint ? (
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{exercise.hint}</p>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setShowHint(true)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Show hint
              </Button>
            )}
          </div>
        )}

        {/* Feedback */}
        {isSubmitted && showFeedback && (
          <div className={cn(
            'flex items-center gap-2 p-3 rounded-lg',
            isCorrect ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
          )}>
            {isCorrect ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Correct! +{exercise.points} points</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Incorrect. Try again next time!</span>
              </>
            )}
          </div>
        )}

        {/* Submit button */}
        {!isSubmitted && (
          <Button
            onClick={handleSubmit}
            disabled={
              (exercise.type === 'multiple-choice' || exercise.type === 'listening-comprehension') 
                ? !selectedAnswer 
                : exercise.type === 'speaking' 
                  ? selectedAnswer !== 'recorded'
                  : !textAnswer.trim()
            }
            className="w-full"
          >
            Check Answer
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
