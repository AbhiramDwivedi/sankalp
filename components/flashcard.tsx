'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card.shadcn'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Volume2, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import type { VocabularyItem } from '@/lib/types'

interface FlashcardProps {
  vocabulary: VocabularyItem[]
  onComplete?: () => void
}

export function Flashcard({ vocabulary, onComplete }: FlashcardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learnedCount, setLearnedCount] = useState(0)

  const currentCard = vocabulary[currentIndex]
  const progress = ((currentIndex + 1) / vocabulary.length) * 100

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else if (onComplete) {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    if (!isFlipped) {
      setLearnedCount(learnedCount + 1)
    }
  }

  const handlePlayAudio = () => {
    // In a real app, this would play the audio file
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.word)
      utterance.lang = 'hi-IN'
      speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Card {currentIndex + 1} of {vocabulary.length}</span>
          <span>{learnedCount} reviewed</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div 
        className="relative h-80 cursor-pointer perspective-1000"
        onClick={handleFlip}
      >
        <div className={cn(
          "absolute inset-0 transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180"
        )}>
          {/* Front of card */}
          <Card className={cn(
            "absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6",
            "bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
          )}>
            <CardContent className="text-center p-0">
              <div className="text-6xl font-bold text-foreground mb-4">
                {currentCard.word}
              </div>
              <div className="text-xl text-muted-foreground mb-2">
                {currentCard.transliteration}
              </div>
              <p className="text-sm text-muted-foreground">
                Tap to reveal meaning
              </p>
            </CardContent>
          </Card>

          {/* Back of card */}
          <Card className={cn(
            "absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 rotate-y-180",
            "bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20"
          )}>
            <CardContent className="text-center p-0">
              <div className="text-2xl font-bold text-foreground mb-2">
                {currentCard.translation}
              </div>
              <div className="text-sm text-muted-foreground mb-4 capitalize">
                {currentCard.partOfSpeech}
              </div>
              {currentCard.example && (
                <div className="mt-4 p-4 bg-background/50 rounded-lg">
                  <p className="text-foreground mb-1">{currentCard.example}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentCard.exampleTranslation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePlayAudio}>
            <Volume2 className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleFlip}>
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentIndex === vocabulary.length - 1 && !onComplete}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Instructions */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        Click the card to flip it. Use arrows to navigate.
      </p>
    </div>
  )
}
